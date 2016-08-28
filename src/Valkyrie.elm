module Valkyrie exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヴァルキリー 1.121"],
     text "ヴァルキリーはフルリスペックされる。",
     secmid "Mending (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secmid "Odin's Will (スペック)",
     text "新しい body resistance debuff が追加される。",
     ulist ["Level 20 - Boost Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - body resistance 15%低下",
            "Level 30 - Support Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - body resistance 30%低下",
            "Level 40 - Bolster Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - body resistance 50%低下"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "ヴァルキリー 1.121B"],
     text "body resistance debuff は以下のように修正される。",
     ulist ["再使用タイマーは5秒から30秒に延長する。",
            "Level 40 debuff Bolster Spellcaster の効果は50%から40%に低下する。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B
