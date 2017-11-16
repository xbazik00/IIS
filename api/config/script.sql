CREATE TABLE IF NOT EXISTS `uzivatel` (
    `prezdivka` varchar(30) NOT NULL,
    `jmeno` varchar(30) NOT NULL,
    `prijmeni` varchar(30) NOT NULL,
    `zeme_puvodu` varchar(30) NOT NULL,
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
    `prezdivka_uzivatele` varchar(10) NOT NULL,
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
    `cislo_uctu` int(20) NOT NULL,
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
    `id` int(10) NOT NULL,
    `vysledek` varchar(30) NOT NULL,
    `datum_a_cas_konani` timestamp NOT NULL,
    `id_turnaj` int(10) NOT NULL,
    `nazev_tymu` varchar(30) NOT NULL,
    `nazev_druheho_tymu` varchar(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `turnaj` (
    `id` int(10) NOT NULL,
    `nazev` varchar(30) NOT NULL,
    `datum_konani` date NOT NULL,
    `hlavni_cena` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    `vitez` varchar(30) NOT NULL,
    `id_organizator_turnaje` int(10) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `organizator_turnaje` (
    `id` int(10) NOT NULL,
    `jmeno` varchar(30) NOT NULL,
    `tel_cislo` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `pozvanka_do_klanu` (
    `tag_klanu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(20) NOT NULL,
    `datum_a_cas_odeslani` timestamp NOT NULL,
    `stav` int(1) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `prezdivka_uzivatele`)
);

CREATE TABLE IF NOT EXISTS `pozvanka_do_tymu` (
    `nazev_tymu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(20) NOT NULL,
    `datum_a_cas_odeslani` timestamp NOT NULL,
    `stav` int(1) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `prezdivka_uzivatele`)
);

ALTER TABLE `hrac` ADD FOREIGN KEY (`prezdivka`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
ALTER TABLE `trener` ADD FOREIGN KEY (`prezdivka`) REFERENCES `uzivatel` (`prezdivka`) ON DELETE CASCADE;
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
ALTER TABLE `turnaj` ADD FOREIGN KEY (`id_organizator_turnaje`) REFERENCES `organizator_turnaje` (`id`) ON DELETE CASCADE;
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