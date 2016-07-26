module Healer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヒーラー 1.121"],
     text "ヒーラーはフルリスペックされる。"]
