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
     text "group target magic ablative chant は削除される。",
     br [] [],
     text "新しい group target magic absorb buff が追加される。",
     ulist ["Level 30 - Odin's Faith - 2.8s cast - 再使用60秒 - 1000 range - 30秒間継続 - 10% power - 150 魔法ダメージ吸収",
            "Level 40 - Odin's Virtue - 2.8s cast - 再使用60秒 - 1000 range - 30秒間継続 - 15% power - 215 魔法ダメージ吸収",
            "Level 50 - Odin's Temperance - 2.8s cast - 再使用60秒 - 1000 range - 30秒間継続 - 25% power - 300 魔法ダメージ吸収"],
     text "新しい body resistance debuff が追加される。",
     ulist ["Level 20 - Boost Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - body resistance 15%低下",
            "Level 30 - Support Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - body resistance 30%低下",
            "Level 40 - Bolster Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - body resistance 50%低下"]]
