# Simple aplicación - lista de tareas

## 1) Instalar Meteor.js


### En OS X o Linux

```
curl https://install.meteor.com/ | sh
```

### En Windows

Descargar ejecutable 

https://install.meteor.com/windows

## 2) Crear nuestra primera aplicación

```
meteor create simple-todos
```

Esto nos crea un folder .meteor y los primeros tres archivos de nuestra aplicación

simple-todos.js
simple-todos.html
simple-todos.css 

Estos tres archivos ya están incluidos para simplemente ser usados

## 3) entramos al folder de la aplicación 

```
cd simple-todos
```

## 3) Iniciamos meteor

```
meteor
```

Esto instala los módulos o componentes principales para que meteor pueda iniciar correctamente, inicia MongoDB y un servidor web escuchando el puerto 3000 este es el puerto por defecto.

Una vez termine meteor este proceso ya podemos ingresar a http://localhost:3000 desde nuestro navegador.

## 4) Ahora a echar un poco de código!!

Empecemos con en HTML, el sistema de templates de meteor se llama spacebars, inspirado en handlebars pero propio de meteor.

Vamos a nuestro archivo simple-todos.html y creamos nuestro primer template para cada tarea

```html
<head>
  <title>Lista de Tareas</title>
</head>
 
<body>
  <div class="container">
    <header>
      <h1>Lista de Tareas</h1>
    </header>
 
    <ul>
      {{#each tasks}}
        {{> task}}
      {{/each}}
    </ul>
  </div>
</body>
 
<template name="task">
  <li>{{text}}</li>
</template>
```

## 5) Creemos información inicial para pasar al template.

Lo que hace el código anterior es crear un template con name "task" que será insertado por cada objeto que tengamos en nuestro arreglo de tareas, y creamos un “ciclo” para que se vaya mostrando según las tareas que se vayan agregando a ese arreglo todos lo que esté dentro de nuestro tag template nunca se imprimirá en nuestro archivo html en el browser.

En nuestro archivo simple-todos.js agregamos el siguiente código

```javascript
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: [
      { text: "This is task 1" },
      { text: "This is task 2" },
      { text: "This is task 3" }
    ]
  });
}
```

El código anterior crea un helper para el body dentro de este creamos un arreglo de tareas iniciales para que lo podamos usar  desde nuestro archivo simple-todos.html

Si nos vamos al browser deberíamos ver ya ver una lista de tres tareas.


## 6) Ahora Persistir información con MongoDB

MongoDB es totalmente soportado para meteor, asi que solo es usarlo desde nuestros archivos js

en nuestro archivo simple-todos.js agregamos 

Tasks = new Mongo.Collection("tasks");

``` javascript 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });
}
```

## 7) Insertemos nuestra primera tarea a la base de datos.

Iniciamos mongo

```
meteor mongo
```

Insertamos la primer tarea

```
db.tasks.insert({ text: "Hello world!", createdAt: new Date() });
```

## 8) Ahora en nuestro html hacemos posible que se puedan crear las tareas.


```html
<div class="container">
  <header>
    <h1>Todo List</h1>

    <form class="new-task">
      <input type="text" name="text" placeholder="Type to add new tasks" />
    </form>
  </header>
  <ul>
```

## 9) agregamos un evento asociado a nuestro input de entrada 

```javascript
return Tasks.find({});
    }
  });
 
  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });
}
```

## 10) Ahora Agreguemos poder cambiar el estado de nuestra tarea o poderla eliminar

actualizamos nuestro template en nuestro archivo simple-todos.html

```html
</body>
 
<template name="task">
  <li class="{{#if checked}}checked{{/if}}">
    <button class="delete">&times;</button>
 
    <input type="checkbox" checked="{{checked}}" class="toggle-checked" />
 
    <span class="text">{{text}}</span>
  </li>
</template>
```

ahora agregamos el evento de cheched y delete

```javascript
  event.target.text.value = "";
    }
  });
 
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}
```

Y ya con esto tenemos un crud para nuestras tareas :)

1) Leer Tareas
2) Crear Tarea
3) Actualizar el estado checked
4) Eliminar Tarea

## 11) Ahora hacemos deploy al servicio en la nube de meteor

```
meteor deploy nombre-de-la-aplicacion.meteor.com
```

Esto toma unos minutos, después que termine ya podemos ingresar a la url a la que le hicimos deploy

http://nombre-de-la-aplicacion.meteor.com


