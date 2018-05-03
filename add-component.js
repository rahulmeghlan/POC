class addComponent {
    constructor() {
        const self = this;
        self.name = 'Rahul';
    }
}

angular.module('app')
    .component('addComponent', {
        templateUrl: 'add-component.html',
        controller: addComponent,
        controllerAs: 'ac'
    });