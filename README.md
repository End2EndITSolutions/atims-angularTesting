# AngularTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

## HTTPS Information
Default android communication needs to be over https. 
Running
ng serve --open --host 0.0.0.0 --port 4500 --ssl

This is used in tandem with angular.json > projects > AngularTest > serve > options.

This allows for accessing the application via the ip of the machine you are running the application on.

Open mobile browser on and use the device's ip and specified port.

To generate .pem files, use mkcert.
If the Certificate Authority (CA) is not recognized on the android device install mkcert as a custom
CA.
