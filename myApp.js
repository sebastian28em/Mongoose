require('dotenv').config();
const mongoose = require('mongoose');
/* Ejercicio N°1 - Conectar a MongoDB Atlas */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



/* Ejercicio N°2 - Crear un modelo */
// Definir el esquema de persona
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Crear el modelo Person
const Person = mongoose.model('Person', personSchema);

/* Ejercicio N°3 - Crear y guardar un registro de un modelo */
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Juan Perez",
    age: 30,
    favoriteFoods: ["pizza", "empanada"]
  });
  person.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Ejercicio N°4 - Crear muchos registros con model.create() */
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Ejercicio N°5 - Buscar registros por nombre usando model.find() */
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Ejercicio N°6 - Buscar un registro por comida favorita usando model.findOne() */
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Ejercicio N°7 - Buscar un registro por _id usando model.findById() */
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Ejercicio N°8 - Buscar, editar y guardar un documento */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return done(err);
    if (!person) return done(new Error('Persona no encontrada'));
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data) {
      if (err) return done(err);
      done(null, data);
    });
  });
};

/* Ejercicio N°9 - Actualizar un documento usando model.findOneAndUpdate() */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function(err, data) {
      if (err) return done(err);
      done(null, data);
    }
  );
};

/* Ejercicio N°10 - Eliminar un documento usando model.findByIdAndRemove() */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Ejercicio N°11 - Eliminar muchos documentos usando model.remove() */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, result) {
    if (err) return done(err);
    done(null, result);
  });
};

/* Ejercicio N°12 - Búsqueda en cadena con helpers de consulta */
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function(err, data) {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
