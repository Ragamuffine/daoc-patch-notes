module Theurgist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "サージスト 1.121"],
     text "サージストはフルリスペックされる。",
     secalb "Earth (スペック)",
     text "Level 26, 36, 46 の pulsing bladeturn は最上位のスペルのみ有効になる。"]
