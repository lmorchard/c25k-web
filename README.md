c25k-web
--------

This is an attempt at building a [Couch-to-5k][c25k] trainer as an HTML5
web app. So far, modules from the [Ampersand][] framework have come in
handy.

[c25k]: http://www.coolrunning.com/engine/2/2_3/181.shtml
[ampersand]: http://ampersandjs.com/

Hacking
-------
```
npm install
npm dedupe
gulp
# open http://localhost:3001
gulp deploy # updates gh-pages branch
```

TODO
----

- [ ]  Better voice samples. (My voice is terrible for this.)

- [ ]  Localization - both in text and in sound cues.

- [ ]  More progress cues - eg. time remaining, runs remaining, halfway

- [ ]  Save elapsed progress for each workout

- [ ]  Submit to Mozilla Marketplace someday?

- [ ]  Social progress sharing stuff

- [ ]  GPS tracking? (probably should be out of scope)
