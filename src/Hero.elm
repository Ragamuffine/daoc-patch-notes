module Hero exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヒーロー 1.121"],
     text "ヒーローはフルリスペックされる。"]