module Style exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Html.Attributes exposing (class, style)

ulist : List String -> Html Message
ulist l =
    ul [class "uk-list uk-list-striped"] (List.map (\s -> li [] [text s]) l)

sec : String -> Html Message
sec s =
    h3 [style [( "border-left", "3px solid #1FA2D6" ), ( "padding-left", "6px" )]] [text s]
