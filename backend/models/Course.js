const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    content: [{
        title: String,
        description: String,
        videoUrl: String,
        materials: [String]
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);