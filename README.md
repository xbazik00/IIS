### API

- POST /api/signIn.php - přihlášení, body: { userName, password }, return: ok - objekt uživatele / err - { error }

#### Uživatel
- GET /api/uzivatel/read.php - vrátí všechny uživatele, return: { items: pole s objekty uživatelů, count: počet objektů }
- GET /api/uzivatel/readOne.php - vrátí uživatele podle prezdívky, body: { userName }, return: ok - objekt uživatele / err - { error }

#### Hra
- GET /api/hra/read.php - vrátí všechny hry, return: { items: pole s objekty her, count: počet objektů }

#### Klan
- GET /api/klan/readOne.php - vrátí klan podle tag, body: { tag }, return: ok - objekt klanu / err - { error }
- POST /api/klan/create.php - přidá nový klan, body: objekt klanu, return: ok - { message: "OK" } / err - { message: "ERR" }