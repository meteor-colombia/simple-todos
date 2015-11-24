Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function(e){
      e.preventDefault();
      debugger;

      var text = e.target.text.value;
      var newTask = {
        text: text,
        createdAt: new Date()
      };
      Tasks.insert(newTask);
      e.target.text.value = '';
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
