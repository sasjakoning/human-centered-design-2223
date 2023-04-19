import express from 'express';
const router = express.Router();

// homepage
router.get('/', (req, res) => {
    res.render('home');
    // res.redirect('/chat');
});

router.get('/chat', (req, res) => {
    res.render('chat');
});


export default router;