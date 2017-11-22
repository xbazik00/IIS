### API

<br />

- POST /api/signIn.php - přihlášení, body: { userName, password }, return: ok - objekt uživatele / err - { error }

<br />

- GET /api/uzivatel/read.php - vrátí všechny uživatele, return: { items: pole s objekty uživatelů, count: počet objektů }
- GET /api/uzivatel/readOne.php - vrátí uživatele podle prezdívky, body: { userName }, return: ok - objekt uživatele / err - { error }
- POST /api/uzivatel/deleteOne.php - odstraní uživatele, body: { userName }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

- GET /api/hra/read.php - vrátí všechny hry, return: { items: pole s objekty her, count: počet objektů }
- POST /api/hra/create.php - vytvoří hru, body: { name, genre, publisher, modes, created }, return: ok - { message: "OK" } / err - { message: "ERR" }
- POST /api/hra/deleteOne.php - odstraní hru, body: { name }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

- GET /api/klan/readOne.php - vrátí klan podle tag, body: { tag }, return: ok - objekt klanu / err - { error }
- POST /api/klan/create.php - přidá nový klan, body: { tag, name, logo, anthem, country, boss }, return: ok - { message: "OK" } / err - { message: "ERR" }
- POST /api/klan/delete.php - odstraní klan a pozvánky do klanu, body: { tag }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

- POST /api/uzivatele_v_klanu/deleteOne.php - odstraní uživatele z klanu, body: { tag, userName }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

- POST /api/pozvanka_do_klanu/read.php - vrátí všechny pozvánky podle přezdívky, body: { userName }, return: { items: pole s objekty pozvánek, count: počet objektů }
- POST /api/pozvanka_do_klanu/create.php - přidá novou pozvánku do klanu, body: { tag, userName }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

- GET /api/sponzor/read.php - vráti všetkých sponzorov, return: { items: pole s objekty sponzorov, count: počet objektů }
- POST /api/sponzor/readOne.php - vrátí sponzora podle zkratky, body: { acronym }, return: ok - objekt sponzora / err - { error }
- POST /api/sponzor/create.php - přidá nového sponzora, body: { acronym, name, seat, account_number }, return: ok - { message: "OK" } / err - { message: "ERR" }
- POST /api/sponzor/delete.php - odstraní sponzora, body: { acronym }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

- POST /api/sponzor_klanu/read.php - vráti všetkých sponzorov klanu, body: { acronym }, return: { items: pole s objekty sponzorov, count: počet objektů }
- POST /api/sponzor_klanu/create.php - přidá nového sponzora klanu, podla acronymu (zkratky sponzora) a tagu klanu , body: { acronym, tag }, return: ok - { message: "OK" } / exists - { message: "EXISTS" }  / err - { message: "ERR" }
- POST /api/sponzor_klanu/delete.php - odstraní sponzora klanu, body: { acronym , tag }, return: ok - { message: "OK" } / err - { message: "ERR" }

<br />

#### TODO API

<br />

- vytvoření a update uživatele
- update hry
- update klanu
- přijetí/odmítnutí pozvánky do klanu
- vytvořit/odstranit/opustit tým
- vytvoření pozvánky do týmu
- přijetí/odmítnutí pozvánky do týmu
- vyhodit hráče z týmu
- přihlásit/odhlásit tým z turnaje

<br />

- organizátor turnaje - bude asi uživatel s rolí ORGANIZATOR - vytvořit testovacího
- vytvořit/editovat/zrušit turnaj
- přidat sponzora turnaje

<br />

- až bude vše hotové, tak i další volání podle modelu případů užití