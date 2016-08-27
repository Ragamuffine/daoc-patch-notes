module Thane exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "セイン 1.121"],
     text "セインはフルリスペックされる。",
     secmid "Stormcalling (スペック)",
     text "新しい single target energy damage type buff が追加される。",
     ulist ["Level 32 - Gift of Lightning - 2.4s cast - 1500 range - 10% power - melee ダメージの属性を energy に変える。"],
     text "新しい self target pulsing PBAoE が追加される。",
     ulist ["Level 42 - Swirling Thunder - 2.5s cast - 再使用30秒 - 25秒間継続 - 20% power - 2.5 秒ごとに 26 energy damage を与える。移動中でも可能。妨害できない。"],
     text "新しい single target 射程延長バフが追加される。",
     ulist ["Level 49 - Thor's Reach - 2.5s cast - 再使用5分 - 1000 range - 25秒間継続 - 25% power - 魔法の射程とレジスト貫通を 15% 増加させる。(レジスト貫通の上限は10%である。)自分には使用できない。"],
     text "level 43 AoE energy debuff, Banish Energy, の効果は 24% から 30% に増加する。",
     text "group fatigue reduction buff はバフではなく pulse になる。"]


all : List (Html Message)
all = patch_1_121
