@echo off
set DNAME="CN=Myself, OU=MyOrganizationUnit, O=MyOrganizationName, L=MyLocalityName,S=MyStateName, C=CN"
set "STOREPASS=zack654321"
set "KEYPASS=zack123456"
set "STOREPATH=.\android\app\ast.keystore"
set "VALIDITY=36500"
set "ALIAS=ast"
set KEYALG="RSA"
set "KEYSIZE=2048"

keytool -genkey -dname %DNAME% -v -keystore %STOREPATH% -storepass %STOREPASS% -alias  %ALIAS% -keyalg %KEYALG% -keysize %KEYSIZE% -keypass %KEYPASS% -validity %VALIDITY%