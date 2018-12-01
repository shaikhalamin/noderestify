#node js query builder Knex tutorial

#install Knex Globally
```javascript

npm install -g knex

```
#locally in the project
```javascript

npm i knex --save

```
```javascript

#setup script in package.json if you don't want to install globally like the following

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "migrate": "knex migrate:latest"
},

```

#the above script will use for running for the following command
```javascript

npm run migrate

```
#So now create migration file for our database by the following command
```javascript
knex migrate:make create_ideas
knex migrate:make create_comments
```
#Ideas Migration file will be the following
```javascript

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ideas', table => {
      table.increments('id').primary()
      table.string('idea')
      table.string('creator')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ideas')
  ])
}

```

#Comments migration file will be the following
```javascript

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', table => {
      table.increments('id').primary()
      table.string('comment')
      table.string('creator')
      table.integer('ideas_id').references('ideas.id')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments')
  ])
}
```

#Now the Migrate the above two table using the following two command
```javascript

knex migrate:latest

```
#we can also make seed using Knex by the following command
```javascript

knex seed:make ideas

```

#To populate table ideas by Knex Seed we have to follow the following convention
```javascript

exports.seed = function (knex, Promise) {
  return knex('ideas').del().then(() => {
    return knex('ideas').insert([
        {creator: 'Ali', idea: 'A To Do List app!'},
        {creator: 'Ali', idea: 'A Blog!'},
        {creator: 'Ali', idea: 'A calculator'}
    ])
  })
}

```

#To populate table with data run the following command
```javascript

knex seed:run
```