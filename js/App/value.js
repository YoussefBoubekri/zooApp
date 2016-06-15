//values cannot be used in config()
//constants can be used in config()
angular.module('animalsModule').value('appSettings', {
    appTitle: 'Montpellier zoo app.',
    appVersion: '0.1.1'
});

/*angular.module('animalsModule').constant('appSettings',{
        appTitle:'Montpellier zoo app.',
        appVersion:'0.1.1'
    });*/