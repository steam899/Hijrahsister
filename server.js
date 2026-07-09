require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin (Requires Service Account JSON in Env or Vercel Config)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Handle newlines in private key for Vercel
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        })
    });
}

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// --- AUTHENTICATION MIDDLEWARE ---
const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(403).json({ error: 'No token provided' });
    const token = bearerHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

// --- PUBLIC API ENDPOINTS (For Frontend) ---
app.get('/api/public/all', async (req, res) => {
    try {
        // Fetch necessary data for initial page load
        const [settings, events, activities, resources, gallery] = await Promise.all([
            db.collection('settings').doc('general').get(),
            db.collection('events').where('status', '==', 'Published').get(),
            db.collection('activities').orderBy('order', 'asc').get(),
            db.collection('resources').get(),
            db.collection('gallery').get()
        ]);

        res.json({
            settings: settings.exists ? settings.data() : {},
            events: events.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            activities: activities.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            resources: resources.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            gallery: gallery.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- PROTECTED ADMIN API ENDPOINTS (CRUD for any collection) ---

// GET All documents in a collection
app.get('/api/admin/:collection', verifyToken, async (req, res) => {
    try {
        const snapshot = await db.collection(req.params.collection).get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(data);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREATE document
app.post('/api/admin/:collection', verifyToken, async (req, res) => {
    try {
        const docRef = await db.collection(req.params.collection).add({
            ...req.body,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.json({ id: docRef.id, message: 'Created successfully' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// UPDATE document
app.put('/api/admin/:collection/:id', verifyToken, async (req, res) => {
    try {
        await db.collection(req.params.collection).doc(req.params.id).set({
            ...req.body,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        res.json({ message: 'Updated successfully' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// DELETE document
app.delete('/api/admin/:collection/:id', verifyToken, async (req, res) => {
    try {
        await db.collection(req.params.collection).doc(req.params.id).delete();
        res.json({ message: 'Deleted successfully' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// Catch-all to serve client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/client/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
