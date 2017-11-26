CREATE TABLE IF NOT EXISTS `uzivatel` (
    `prezdivka` varchar(30) NOT NULL,
    `jmeno` varchar(30) NOT NULL,
    `prijmeni` varchar(30) NOT NULL,
    `zeme_puvodu` varchar(30) NOT NULL,
    `role` varchar(30) NOT NULL,
    `heslo` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka`)
);

CREATE TABLE IF NOT EXISTS `hrac` (
    `prezdivka` varchar(30) NOT NULL,
    `herni_mys` varchar(30) NOT NULL,
    `klavesnice` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka`)
);

CREATE TABLE IF NOT EXISTS `trener` (
    `prezdivka` varchar(30) NOT NULL,
    `poznamky` varchar(1000) NOT NULL,
    PRIMARY KEY (`prezdivka`)
);

CREATE TABLE IF NOT EXISTS `specializace_uzivatele_na_hru` (
    `prezdivka_uzivatele` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka_uzivatele`, `nazev_hry`)
);

CREATE TABLE IF NOT EXISTS `klan` (
    `tag` varchar(30) NOT NULL,
    `nazev` varchar(30) NOT NULL,
    `logo` varchar(30) NOT NULL,
    `hymna` varchar(30) NOT NULL,
    `zeme_pusobeni` varchar(30) NOT NULL,
    `vudce_klanu` varchar(30) NOT NULL,
    PRIMARY KEY (`tag`)
);

CREATE TABLE IF NOT EXISTS `uzivatele_v_klanu` (
    `prezdivka_uzivatele` varchar(30) NOT NULL,
    `tag_klanu` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka_uzivatele`, `tag_klanu`)
);

CREATE TABLE IF NOT EXISTS `specializace_klanu_na_hru` (
    `tag_klanu` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `nazev_hry`)
);

CREATE TABLE IF NOT EXISTS `financovani_klanu` (
    `tag_klanu` varchar(30) NOT NULL,
    `zkratka_sponzora` varchar(30) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `zkratka_sponzora`)
);

CREATE TABLE IF NOT EXISTS `tym` (
    `nazev_tymu` varchar(30) NOT NULL,
    `pocet_hracu` int(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    PRIMARY KEY (`nazev_tymu`)
);

CREATE TABLE IF NOT EXISTS `tymy_v_turnaji` (
    `nazev_tymu` varchar(30) NOT NULL,
    `id_turnaj` int(10) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `id_turnaj`)
);

CREATE TABLE IF NOT EXISTS `uzivatele_v_tymech` (
    `nazev_tymu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(30) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `prezdivka_uzivatele`)
);

CREATE TABLE IF NOT EXISTS `hra` (
    `nazev` varchar(30) NOT NULL,
    `datum_vydani` date NOT NULL,
    `zanr` varchar(30) NOT NULL,
    `mody` varchar(100) NOT NULL,
    `vydavatel` varchar(30) NOT NULL,
    PRIMARY KEY (`nazev`)
);

CREATE TABLE IF NOT EXISTS `sponzor` (
    `zkratka` varchar(30) NOT NULL,
    `nazev` varchar(30) NOT NULL,
    `sidlo` varchar(30) NOT NULL,
    `cislo_uctu` bigint(15) NOT NULL,
    PRIMARY KEY (`zkratka`)
);

CREATE TABLE IF NOT EXISTS `hlavni_sponzor_turnaje` (
    `zkratka_sponzora` varchar(30) NOT NULL,
    `id_turnaj` int(10) NOT NULL,
    PRIMARY KEY (`zkratka_sponzora`, `id_turnaj`)
);

CREATE TABLE IF NOT EXISTS `sponzor_turnaje` (
    `zkratka_sponzora` varchar(30) NOT NULL,
    `id_turnaj` int(10) NOT NULL,
    PRIMARY KEY (`zkratka_sponzora`, `id_turnaj`)
);

CREATE TABLE IF NOT EXISTS `zapas` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `vysledek` varchar(30) NOT NULL,
    `datum_a_cas_konani` timestamp NOT NULL,
    `id_turnaj` int(10) NOT NULL,
    `nazev_tymu` varchar(30) NOT NULL,
    `nazev_druheho_tymu` varchar(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `turnaj` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `nazev` varchar(30) NOT NULL,
    `datum_konani` date NOT NULL,
    `hlavni_cena` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    `vitez` varchar(30) NOT NULL,
    `prezdivka_organizator_turnaje` varchar(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `organizator_turnaje` (
    `prezdivka` varchar(30) NOT NULL,
    `jmeno` varchar(30) NOT NULL,
    `tel_cislo` varchar(20) NOT NULL,
    PRIMARY KEY (`prezdivka`)
);

CREATE TABLE IF NOT EXISTS `pozvanka_do_klanu` (
    `tag_klanu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(20) NOT NULL,
    `datum_a_cas_odeslani` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `stav` int(1) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `prezdivka_uzivatele`)
);

CREATE TABLE IF NOT EXISTS `pozvanka_do_tymu` (
    `nazev_tymu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(20) NOT NULL,
    `datum_a_cas_odeslani` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `stav` int(1) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `prezdivka_uzivatele`)
);

ALTER TABLE `hrac` ADD FOREIGN KEY (`prezdivka`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `trener` ADD FOREIGN KEY (`prezdivka`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `organizator_turnaje` ADD FOREIGN KEY (`prezdivka`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `specializace_uzivatele_na_hru` ADD FOREIGN KEY (`prezdivka_uzivatele`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `specializace_uzivatele_na_hru` ADD FOREIGN KEY (`nazev_hry`) REFERENCES `hra` (`nazev`) ON DELETE CASCADE;
ALTER TABLE `tym` ADD FOREIGN KEY (`nazev_hry`) REFERENCES `hra` (`nazev`) ON DELETE CASCADE;
ALTER TABLE `tymy_v_turnaji` ADD FOREIGN KEY (`nazev_tymu`) REFERENCES `tym` (`nazev_tymu`) ON DELETE CASCADE;
ALTER TABLE `tymy_v_turnaji` ADD FOREIGN KEY (`id_turnaj`) REFERENCES `turnaj` (`id`) ON DELETE CASCADE;
ALTER TABLE `uzivatele_v_tymech` ADD FOREIGN KEY (`nazev_tymu`) REFERENCES `tym` (`nazev_tymu`) ON DELETE CASCADE;
ALTER TABLE `uzivatele_v_tymech` ADD FOREIGN KEY (`prezdivka_uzivatele`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `hlavni_sponzor_turnaje` ADD FOREIGN KEY (`zkratka_sponzora`) REFERENCES `sponzor` (`zkratka`) ON DELETE CASCADE;
ALTER TABLE `hlavni_sponzor_turnaje` ADD FOREIGN KEY (`id_turnaj`) REFERENCES `turnaj` (`id`) ON DELETE CASCADE;
ALTER TABLE `sponzor_turnaje` ADD FOREIGN KEY (`zkratka_sponzora`) REFERENCES `sponzor` (`zkratka`) ON DELETE CASCADE;
ALTER TABLE `sponzor_turnaje` ADD FOREIGN KEY (`id_turnaj`) REFERENCES `turnaj` (`id`) ON DELETE CASCADE;
ALTER TABLE `zapas` ADD FOREIGN KEY (`nazev_tymu`) REFERENCES `tym` (`nazev_tymu`) ON DELETE CASCADE;
ALTER TABLE `zapas` ADD FOREIGN KEY (`nazev_druheho_tymu`) REFERENCES `tym` (`nazev_tymu`) ON DELETE CASCADE;
ALTER TABLE `turnaj` ADD FOREIGN KEY (`nazev_hry`) REFERENCES `hra` (`nazev`) ON DELETE CASCADE;
ALTER TABLE `turnaj` ADD FOREIGN KEY (`vitez`) REFERENCES `tym` (`nazev_tymu`) ON DELETE CASCADE;
ALTER TABLE `turnaj` ADD FOREIGN KEY (`prezdivka_organizator_turnaje`) REFERENCES `organizator_turnaje` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `klan` ADD FOREIGN KEY (`vudce_klanu`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `uzivatele_v_klanu` ADD FOREIGN KEY (`prezdivka_uzivatele`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `uzivatele_v_klanu` ADD FOREIGN KEY (`tag_klanu`) REFERENCES `klan` (`tag`) ON DELETE CASCADE;
ALTER TABLE `specializace_klanu_na_hru` ADD FOREIGN KEY (`tag_klanu`) REFERENCES `klan` (`tag`) ON DELETE CASCADE;
ALTER TABLE `specializace_klanu_na_hru` ADD FOREIGN KEY (`nazev_hry`) REFERENCES `hra` (`nazev`) ON DELETE CASCADE;
ALTER TABLE `financovani_klanu` ADD FOREIGN KEY (`tag_klanu`) REFERENCES `klan` (`tag`) ON DELETE CASCADE;
ALTER TABLE `financovani_klanu` ADD FOREIGN KEY (`zkratka_sponzora`) REFERENCES `sponzor` (`zkratka`) ON DELETE CASCADE;
ALTER TABLE `pozvanka_do_klanu` ADD FOREIGN KEY (`tag_klanu`) REFERENCES `klan` (`tag`) ON DELETE CASCADE;
ALTER TABLE `pozvanka_do_klanu` ADD FOREIGN KEY (`prezdivka_uzivatele`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `pozvanka_do_tymu` ADD FOREIGN KEY (`nazev_tymu`) REFERENCES `tym` (`nazev_tymu`) ON DELETE CASCADE;
ALTER TABLE `pozvanka_do_tymu` ADD FOREIGN KEY (`prezdivka_uzivatele`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;

-- admin
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('admin', 'admin', 'admin', 'CZ', 'ADMIN', 'admin');

INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Dumbledore', 'Michael', 'Gambon', 'GB', 'COACH', '');
INSERT INTO `trener` (`prezdivka`, `poznamky`) VALUES ('Dumbledore', 'Harry is a wizard.');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Harry_Potter', 'Daniel', 'Radcliffe', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Harry_Potter', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Ron_Weasley', 'Rupert', 'Grint', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Ron_Weasley', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Hermione_Granger', 'Emma', 'Watson', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Hermione_Granger', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Neville_Longbottom', 'Matthew', 'Lewis', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Neville_Longbottom', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Draco_Malfoy', 'Tom', 'Felton', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Draco_Malfoy', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Miles_Bletchley', 'No', 'Name', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Miles_Bletchley', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Gregory_Goyle', 'Josh', 'Herdman', 'GB', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Gregory_Goyle', 'Magic Mouse', 'Magic Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('TyrionLanister', 'Peter', 'Dinklage', 'US', 'COACH', '');
INSERT INTO `trener` (`prezdivka`, `poznamky`) VALUES ('TyrionLanister', 'Khaleesi FTW');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Rick_Grimes', 'Andrew', 'Lincoln', 'GB', 'COACH', '');
INSERT INTO `trener` (`prezdivka`, `poznamky`) VALUES ('Rick_Grimes', 'Negan must die.');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('DarylDixon', 'Norman', 'Reedus', 'US', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('DarylDixon', 'Zombie Mouse', 'Zombie Keyboard');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Negan', 'Jeffrey Dean', 'Morgan', 'US', 'PLAYER', '');
INSERT INTO `hrac` (`prezdivka`, `herni_mys`, `klavesnice`) VALUES ('Negan', 'Lucille Mouse', 'Lucille Keyboard');

INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('Jones', 'Jeff', 'Jones', 'US', 'ORGANIZATOR', '');
INSERT INTO `organizator_turnaje` (`prezdivka`,`jmeno`, `tel_cislo`) VALUES ('Jones','UBER', '941111111');
INSERT INTO `uzivatel` (`prezdivka`, `jmeno`, `prijmeni`, `zeme_puvodu`, `role`, `heslo`) VALUES ('gates', 'Bill', 'Gates', 'US', 'ORGANIZATOR', '');
INSERT INTO `organizator_turnaje` (`prezdivka`,`jmeno`, `tel_cislo`) VALUES ('gates','Microsoft', '945411213');


INSERT INTO `klan` (`tag`, `nazev`, `logo`, `hymna`, `zeme_pusobeni`, `vudce_klanu`) VALUES ('Hogwarts', 'Hogwarts', 'The Hogwarts Logo', 'The Hogwarts Song', 'GB', 'Dumbledore');
INSERT INTO `klan` (`tag`, `nazev`, `logo`, `hymna`, `zeme_pusobeni`, `vudce_klanu`) VALUES ('GOT', 'Game of Thrones', 'Logo with dragon', 'The song of ice and fire', 'US', 'TyrionLanister');
INSERT INTO `klan` (`tag`, `nazev`, `logo`, `hymna`, `zeme_pusobeni`, `vudce_klanu`) VALUES ('TWD', 'The Walking Dead', 'Zombie logo', 'TWD soundtrack', 'US', 'Rick_Grimes');

INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Dumbledore', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Harry_Potter', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Ron_Weasley', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Hermione_Granger', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Draco_Malfoy', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Miles_Bletchley', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Gregory_Goyle', 'Hogwarts');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('TyrionLanister', 'GOT');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Rick_Grimes', 'TWD');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('DarylDixon', 'TWD');
INSERT INTO `uzivatele_v_klanu` (`prezdivka_uzivatele`, `tag_klanu`) VALUES ('Negan', 'TWD');

INSERT INTO `hra` (`nazev`, `datum_vydani`, `zanr`, `vydavatel`, `mody`) VALUES ('Quidditch', '2015-12-17', 'Magic ball game', 'Unknown', '');
INSERT INTO `hra` (`nazev`, `datum_vydani`, `zanr`, `vydavatel`, `mody`) VALUES ('Killing White Walkers', '2011-01-30', 'Killing game', 'Old Gods', '');
INSERT INTO `hra` (`nazev`, `datum_vydani`, `zanr`, `vydavatel`, `mody`) VALUES ('Killing Zombies', '2010-10-12', 'Killing game', 'vlĂˇda US', '');

INSERT INTO `specializace_klanu_na_hru` (`tag_klanu`,`nazev_hry`) VALUES ('Hogwarts','Quidditch');
INSERT INTO `specializace_klanu_na_hru` (`tag_klanu`,`nazev_hry`) VALUES ('GOT','Killing White Walkers');
INSERT INTO `specializace_klanu_na_hru` (`tag_klanu`,`nazev_hry`) VALUES ('TWD','Killing Zombies');

INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Dumbledore','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Harry_Potter','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Ron_Weasley','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Hermione_Granger','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Draco_Malfoy','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Miles_Bletchley','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Gregory_Goyle','Quidditch');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('TyrionLanister','Killing White Walkers');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Rick_Grimes','Killing Zombies');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('DarylDixon','Killing Zombies');
INSERT INTO `specializace_uzivatele_na_hru` (`prezdivka_uzivatele`,`nazev_hry`) VALUES ('Negan','Killing Zombies');

INSERT INTO `tym` (`nazev_tymu`, `pocet_hracu`, `nazev_hry`) VALUES ('Gryffindor', 3, 'Quidditch');
INSERT INTO `tym` (`nazev_tymu`, `pocet_hracu`, `nazev_hry`) VALUES ('Slytherin', 3, 'Quidditch');
INSERT INTO `tym` (`nazev_tymu`, `pocet_hracu`, `nazev_hry`) VALUES ('Team Khaleesi', 1, 'Killing White Walkers');
INSERT INTO `tym` (`nazev_tymu`, `pocet_hracu`, `nazev_hry`) VALUES ('Team Rick', 2, 'Killing Zombies');
INSERT INTO `tym` (`nazev_tymu`, `pocet_hracu`, `nazev_hry`) VALUES ('Team Negan', 1, 'Killing Zombies');

INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Gryffindor', 'Harry_Potter');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Gryffindor', 'Ron_Weasley');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Gryffindor', 'Hermione_Granger');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Slytherin', 'Draco_Malfoy');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Slytherin', 'Miles_Bletchley');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Slytherin', 'Gregory_Goyle');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Team Khaleesi', 'TyrionLanister');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Team Rick', 'Rick_Grimes');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Team Rick', 'DarylDixon');
INSERT INTO `uzivatele_v_tymech` (`nazev_tymu`, `prezdivka_uzivatele`) VALUES ('Team Negan', 'Negan');

INSERT INTO `turnaj` (`nazev`, `datum_konani`, `hlavni_cena`, `nazev_hry`, `vitez`, `prezdivka_organizator_turnaje`) VALUES ('3-wizard', '2015-12-17', 'CUP', 'Quidditch', 'Gryffindor', 'Jones');
INSERT INTO `turnaj` (`nazev`, `datum_konani`, `hlavni_cena`, `nazev_hry`, `vitez`, `prezdivka_organizator_turnaje`) VALUES ('Rick vs Negan', '2011-01-30', 'Life', 'Killing Zombies', 'Team Negan', 'Jones');
INSERT INTO `turnaj` (`nazev`, `datum_konani`, `hlavni_cena`, `nazev_hry`, `vitez`, `prezdivka_organizator_turnaje`) VALUES ('Rick vs Negan', '2010-10-12', 'Life', 'Killing Zombies', 'Team Rick', 'gates');

INSERT INTO `tymy_v_turnaji` (`nazev_tymu`, `id_turnaj`) VALUES ('Slytherin',2);
INSERT INTO `tymy_v_turnaji` (`nazev_tymu`, `id_turnaj`) VALUES ('Gryffindor',2);
INSERT INTO `tymy_v_turnaji` (`nazev_tymu`, `id_turnaj`) VALUES ('Team Rick',10);
INSERT INTO `tymy_v_turnaji` (`nazev_tymu`, `id_turnaj`) VALUES ('Team Negan',10);

INSERT INTO `sponzor` (`zkratka`, `cislo_uctu`, `sidlo`, `nazev`) VALUES ('GM', 456435735734, 'Detroid, US', 'General Motors');
INSERT INTO `sponzor` (`zkratka`, `cislo_uctu`, `sidlo`, `nazev`) VALUES ('MG', 456435735735, 'New York, US', 'Motor General');

INSERT INTO `sponzor_turnaje` (`zkratka_sponzora`, `id_turnaj`) VALUES ('GM', 2);
INSERT INTO `sponzor_turnaje` (`zkratka_sponzora`, `id_turnaj`) VALUES ('MG', 2);
INSERT INTO `sponzor_turnaje` (`zkratka_sponzora`, `id_turnaj`) VALUES ('MG', 10);

INSERT INTO `financovani_klanu` (`tag_klanu`,`zkratka_sponzora`) VALUES ('Hogwarts','MG');
INSERT INTO `financovani_klanu` (`tag_klanu`,`zkratka_sponzora`) VALUES ('GOT','GM');

INSERT INTO `zapas` (`vysledek`, `datum_a_cas_konani`, `id_turnaj`, `nazev_tymu`, `nazev_druheho_tymu`) VALUES ('16:20', '2015-12-17', 2, 'Slytherin', 'Gryffindor');
INSERT INTO `zapas` (`vysledek`, `datum_a_cas_konani`, `id_turnaj`, `nazev_tymu`, `nazev_druheho_tymu`) VALUES ('0:2', '2016-12-17', 10, 'Team Rick', 'Team Negan');
INSERT INTO `zapas` (`vysledek`, `datum_a_cas_konani`, `id_turnaj`, `nazev_tymu`, `nazev_druheho_tymu`) VALUES ('0:1', '2016-12-17', 10, 'Team Rick', 'Team Negan');
INSERT INTO `zapas` (`vysledek`, `datum_a_cas_konani`, `id_turnaj`, `nazev_tymu`, `nazev_druheho_tymu`) VALUES ('1:0', '2010-10-12', 15, 'Team Rick', 'Team Negan');
