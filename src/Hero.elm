module Hero exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヒーロー 1.121"],
     text "ヒーローはフルリスペックされる。",
     sechib "Celtic Spear (スペック)",
     ulist ["Level 34 - Eagle Talon - Anytime - スタイルダメージやや減少",
            "Level 50 - Cuchulain's Revenge - Dragon Talon - スタイルダメージ増加"],
     sechib "Large Weaponry (スペック)",
     ulist ["Level 34 - Demolish - Anytime - スタイルダメージやや減少",
            "Level 50 - Annihilation - Rear - スタイルダメージ増加"]]
