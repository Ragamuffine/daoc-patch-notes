module Warlock exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ウォーロック 1.121"],
     text "ウォーロックはフルリスペックされる。",
     text "ウォーロックはレルムアビリティーをリスペックされる。",
     text "レルムアビリティーに Ichor of the Deep が追加される。",
     secmid "Witchcraft (スペック)",
     text "すべての DoT は除去され新しい DoT に置き換えられる。",
     br [] [],
     text "Dread",
     ulist ["Level 8 - Weak Dread - 25秒間継続 - 2s frequency - 10 body damage - 自分に対し 10 magic-ablative buff - instant cast",
            "Level 22 - Minor Dread - 25秒間継続 - 2s frequency - 20 body damage - 自分に対し 25 magic-ablative buff - instant cast",
                "Level 32 - Lesser Dread - 25秒間継続 - 2s frequency - 35 body damage - 自分に対し 50 magic-ablative self - instant cast",
                "Level 42 - Dread - 25秒間継続 - 2s frequency - 55 body damage - 自分に対し 100 magic-ablative buff - instant cast"],
     text "Anguish",
     ulist ["Level 14 - Weak Anguish - 30秒間継続 - 2s frequency - 12 matter damage - 3s cast time",
            "Level 24 -Minor Anguish - 30秒間継続 - 2s frequency - 37 matter damage - 3s cast time",
            "Level 34 - Lesser Anguish - 30秒間継続 - 2s frequency - 47 matter damage - 3s cast time",
            "Level 44 - Anguish - 30秒間継続 - 2s frequency - 60 matter damage - 3s cast time"],
     text "Agony - Dread と Anguish が効果中であるターゲットに使用できる",
     ulist ["Level 27 - Minor Agony - 25秒間継続 - 2s frequency - 30 cold damage - 3s cast time - disease",
            "Level 37 - Lesser Agony - 25秒間継続 - 2s frequency - 60 cold damage - 3s cast time - disease",
            "Level 47 -Agony - 25秒間継続 - 2s frequency - 110 cold damage - 3s cast time - disease"],
     text "Doom - Dread, Anguish, Agony がすべて効果中のターゲットに使用できる",
     ulist ["Level 50 - Doom - 10秒間継続 - 2s frequency - 205 spirit damage - 3s cast time - cure されるまたは効果が切れると 700 direct damage"]]
