module Armsman exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "アームズマン 1.121"],
     secalb "長柄",
     ulist ["Level 34 - Defender's Rage - Anytime - スタイルダメージやや減少",
            "Level 44 - Defender's Revenge - Phalanx - ダメージ増加",
            "Level 50 - Defender's Aegis - Poleaxe - スタイルダメージ増加"],
     secalb "両手",
     ulist ["Level 34 - Obfuscate - Anytime - スタイルダメージやや減少",
            "Level 44 - Two Moons - Onslaught - スタイルダメージ増加",
            "Level 50 - Sun and Moon - Doubler - スタイルダメージ増加"]]
