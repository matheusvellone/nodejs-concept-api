Console
-------

Sometimes is helpful to have a node REPL which have all the app as the context with all the configuration to fix some broken records in database, or to reset user password before this feature even exists.
To solve this problem, there is the `make -f Makefile.prd console` command, which will open run NodeJS in REPL mode, so you can write your own script and run it as it was running through a HTTP request.
