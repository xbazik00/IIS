CREATE TABLE IF NOT EXISTS `uzivatel` {
    `prezdivka` varchar(30) NOT NULL,
    `jmeno` varchar(30) NOT NULL,
    `prijmeni` varchar(30) NOT NULL,
    `zeme_puvodu` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka`)
}

CREATE TABLE IF NOT EXISTS `hrac` {
    `prezdivka` varchar(30) NOT NULL,
    `herni_mys` varchar(30) NOT NULL,
    `klavesnice` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka`)
}

CREATE TABLE IF NOT EXISTS `trener` {
    `prezdivka` varchar(30) NOT NULL,
    `poznamky` varchar(1000) NOT NULL,
    PRIMARY KEY (`prezdivka`)
}

CREATE TABLE IF NOT EXISTS `specializace_uzivatele_na_hru` {
    `prezdivka_uzivatele` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka_uzivatele`, `nazev_hry`)
}

CREATE TABLE IF NOT EXISTS `klan` {
    `tag` varchar(30) NOT NULL,
    `nazev` varchar(30) NOT NULL,
    `logo` varchar(30) NOT NULL,
    `hymna` varchar(30) NOT NULL,
    `zeme_pusobeni` varchar(30) NOT NULL,
    `vudce_klanu` varchar(30) NOT NULL,
    PRIMARY KEY (`tag`)
}

CREATE TABLE IF NOT EXISTS `uzivatele_v_klanu` {
    `prezdivka_uzivatele` varchar(30) NOT NULL,
    `tag_klanu` varchar(30) NOT NULL,
    PRIMARY KEY (`prezdivka_uzivatele`, `tag_klanu`)
}

CREATE TABLE IF NOT EXISTS `specializace_klanu_na_hru` {
    `tag_klanu` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `nazev_hry`)
}

CREATE TABLE IF NOT EXISTS `financovani_klanu` {
    `tag_klanu` varchar(30) NOT NULL,
    `zkratka_sponzora` varchar(30) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `zkratka_sponzora`)
}

CREATE TABLE IF NOT EXISTS `tym` {
    `nazev_tymu` varchar(30) NOT NULL,
    `pocet_hracu` int(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    PRIMARY KEY (`nazev_tymu`)
}

CREATE TABLE IF NOT EXISTS `tymy_v_turnaji` {
    `nazev_tymu` varchar(30) NOT NULL,
    `id_turnaje` int(10) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `id_turnaje`)
}

CREATE TABLE IF NOT EXISTS `uzivatele_v_tymech` {
    `nazev_tymu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(10) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `prezdivka_uzivatele`)
}

CREATE TABLE IF NOT EXISTS `hra` {
    `nazev` varchar(30) NOT NULL,
    `datum_vydani` date NOT NULL,
    `zanr` varchar(30) NOT NULL,
    `mody` varchar(100) NOT NULL,
    `vydavatel` varchar(30) NOT NULL,
    PRIMARY KEY (`nazev`)
}

CREATE TABLE IF NOT EXISTS `sponzor` {
    `zkratka` varchar(30) NOT NULL,
    `nazev` varchar(30) NOT NULL,
    `sidlo` varchar(30) NOT NULL,
    `cislo_uctu` int(20) NOT NULL,
    PRIMARY KEY (`zkratka`)
}

CREATE TABLE IF NOT EXISTS `hlavni_sponzor_turnaje` {
    `zkratka_sponzora` varchar(30) NOT NULL,
    `id_turnaj` varchar(10) NOT NULL,
    PRIMARY KEY (`zkratka_sponzora`, `id_turnaj`)
}

CREATE TABLE IF NOT EXISTS `sponzor_turnaje` {
    `zkratka_sponzora` varchar(30) NOT NULL,
    `id_turnaj` varchar(10) NOT NULL,
    PRIMARY KEY (`zkratka_sponzora`, `id_turnaj`)
}

CREATE TABLE IF NOT EXISTS `zapas` {
    `id` int(10) NOT NULL,
    `vysledek` varchar(30) NOT NULL,
    `datum_a_cas_konani` timestamp NOT NULL,
    `id_turnaj` int(10) NOT NULL,
    `nazev_tymu` varchar(30) NOT NULL,
    `nazev_druheho_tymu` varchar(30) NOT NULL,
    PRIMARY KEY (`id`)
}

CREATE TABLE IF NOT EXISTS `turnaj` {
    `id` int(10) NOT NULL,
    `nazev` varchar(30) NOT NULL,
    `datum_konani` date NOT NULL,
    `hlavni_cena` varchar(30) NOT NULL,
    `nazev_hry` varchar(30) NOT NULL,
    `vitez` varchar(30) NOT NULL,
    `id_organizator_turnaje` int(10) NOT NULL,
    PRIMARY KEY (`id`)
}

CREATE TABLE IF NOT EXISTS `organizator_turnaje` {
    `id` int(10) NOT NULL,
    `jmeno` varchar(30) NOT NULL,
    `tel_cislo` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
}

CREATE TABLE IF NOT EXISTS `pozvanka_do_klanu` {
    `tag_klanu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(20) NOT NULL,
    `datum_a_cas_odeslani` timestamp NOT NULL,
    `stav` int(1) NOT NULL,
    PRIMARY KEY (`tag_klanu`, `prezdivka_uzivatele`)
}

CREATE TABLE IF NOT EXISTS `pozvanka_do_tymu` {
    `nazev_tymu` varchar(30) NOT NULL,
    `prezdivka_uzivatele` varchar(20) NOT NULL,
    `datum_a_cas_odeslani` timestamp NOT NULL,
    `stav` int(1) NOT NULL,
    PRIMARY KEY (`nazev_tymu`, `prezdivka_uzivatele`)
}