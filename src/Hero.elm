module Hero exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヒーロー 1.121"],
     sechib "Celtic Spear (スペック)",
     ulist ["Level 15 - Hunter's Lance - Hunter's Boon - ダメージ増加",
            "Level 34 - Eagle Talon - Anytime - ダメージ減少",
            "Level 44 - Dragon Talon - Side - ダメージやや増加",
            "Level 50 - Cuchulain's Revenge - Dragon Talon - ダメージ増加"],
     sechib "Large Weaponry (スペック)",
     ulist ["Level 15 - Domination - Side - ダメージ増加",
            "Level 34 - Demolish - Anytime - ダメージ減少",
            "Level 39 - Shatter - Hibernian Force - ダメージ増加",
            "Level 50 - Annihilation - Rear - ダメージ増加"]]


all : List (Html Message)
all = patch_1_121
