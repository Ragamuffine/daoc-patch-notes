module Animist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "アニミスト 1.121"],
     text "アニミストはフルリスペックされる。",
     sec "Arboreal Path (基本)",
     ulist ["level 45 lifedrain のダメージを164から179に増加させる。"],
     sec "Arboreal Mastery (スペック)",
     text "動きは遅いが大ダメージの bomber を追加する。この bomber は破壊が可能。また stun で止めることも可能。confuse でも破壊される。",
     text "1875 range, 5s cast time, 再使用2分, quickcast不可.",
     ulist ["Level 13 - Heavy Spirit. 99 body damage.",
            "Level 23 - Plump Spirit. 199 body damage.",
            "Level 33 - Inflated Spirit. 329 body damage.",
            "Level 45 - Bulging Spirit. 499 body damage."],
     sec "Creeping Mastery (スペック)",
     text "AoE root の距離を 1500 から 1875 に延長する。",
     text "Body resistance debuff, PBAoE melee DPS debuff ペットを除去する。",
     text "新しい damage bomber スペルを追加",
     ulist ["Level 7 - Spirit of Deceit - 2.8s cast - 1500 range - 34 matter damage - 5 power cost",
            "Level 16 - Spirit of Cunning - 2.8s cast - 1500 range - 68 matter damage - 10 power cost",
            "Level 27 - Spirit of Trickery - 2.8s cast - 1500 range - 122 matter damage - 13 power cost",
            "Level 38 - Spirit of Deception - 2.8s cast - 1500 range - 153 matter damage - 25 power cost",
            "Level 47 - Spirit of Guile - 2.8s cast - 1500 range - 199 matter damage - 31 power cost"],
     text "新しい ground-targeted の healing shroom を追加",
     ulist ["Level 9 - Grove Sibyl - 5s cast - 1500 range - 120秒間継続 - 16 power cost - 20 hit point heal, 850 range",
            "Level 21 - Grove Augur - 5s cast - 1500 range - 120秒間継続 - 38 power cost - 55 hit point heal, 850 range",
            "Level 32 - Grove Oracle - 5s cast - 1500 range - 120秒間継続 - 50 power cost - 100 hit point heal, 850 range",
            "Level 42 - Grove Druid - 5s cast - 1500 range - 120秒間継続 - 65 power cost - 215 hit point heal, 850 range"],
    text "新しい ground-targeted の diseasing shroom を追加",
    ulist ["Level 5 - Forest's Blight - 5s cast - 1500 range - 120秒間継続 - 8 power cost - 10秒間 disease, 850 range, disease potency: 5 str debuff, 3% snare",
           "Level 14 - Forest's Curse - 5s cast - 1500 range - 120秒間継続 - 16 power cost - 15秒間 disease, 850 range, disease potency: 10 str debuff, 6% snare",
           "Level 20 - Forest's Scourge - 5s cast - 1500 range - 120秒間継続 - 34 power cost - 30秒間 disease, 850 range, disease potency: 15 str debuff, 9% snare",
           "Level 31 - Forest's Torment - 5s cast - 1500 range - 120秒間継続 - 50 power cost - 30秒間 disease, 850 range, disease potency: 20 str debuff, 12% snare",
           "Level 41 - Forest's Menace - 5s cast - 1500 range - 120秒間継続 - 65 power cost - 30秒間 disease, 850 range, disease potency: 25 str debuff, 15% snare"],
    text "新しい instant-cast, ground-targeted の healing shroom を追加",
    ulist ["Level 50 - Shroom of Life - instant cast - 15秒間継続 - 30 power - 400 pbaoe hit point heal, 350 range"]]
