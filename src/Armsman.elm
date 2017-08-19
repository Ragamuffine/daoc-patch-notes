module Armsman exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "アームズマン 1.121"],
     secalb "長柄",
     ulist ["Level 25 - Phalanx - Rear - ダメージ増加",
            "Level 34 - Defender's Rage - Anytime - ダメージ減少",
            "Level 39 - Poleaxe - Side - ダメージやや増加",
            "Level 44 - Defender's Revenge - Phalanx - ダメージ増加",
            "Level 50 - Defender's Aegis - Poleaxe - ダメージ増加"],
     secalb "両手",
     ulist ["Level 34 - Obfuscate - Anytime - スタイルダメージやや減少",
            "Level 44 - Two Moons - Onslaught - スタイルダメージ増加",
            "Level 50 - Sun and Moon - Doubler - スタイルダメージ増加"]]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "アームズマン 1.123"],
     text "アームズマンはフルリスペックされる。",
     secalb "長柄 (スペック)",
     text "新しいスタイルが追加される。",
     ulist ["Level 48 - Defender's Advance - High Endurance - Very High Damage - Low Hit Bonus - Medium Defensive Bonus - 出血20ダメージ, 4秒ごと, 20秒持続"]]


all : List (Html Message)
all = patch_1_121
      ++ patch_1_123
