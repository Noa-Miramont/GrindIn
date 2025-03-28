const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('❌ MONGODB_URI non défini dans le fichier .env');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
    console.log(`📊 Base de données : ${conn.connection.name}`);
    
    // Afficher les collections existantes
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Collections existantes :', collections.map(c => c.name));
    
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);
    process.exit(1); // Arrête l'app en cas d'échec
  }
};

module.exports = connectDB;
