module Style exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Html.Attributes exposing (class, style)

ulist : List String -> Html Message
ulist l =
    ul [class "uk-list uk-list-striped"] (List.map (\s -> li [] [text s]) l)

sec : String -> Html Message
sec s =
    h3 [style [( "border-left", "3px solid #e6e600" ), ( "padding-left", "6px" )]] [text s]

secalb : String -> Html Message
secalb s =
    h3 [style [( "border-left", "3px solid #cc0000" ), ( "padding-left", "6px" )]] [text s]

secmid : String -> Html Message
secmid s =
    h3 [style [( "border-left", "3px solid #00bfff" ), ( "padding-left", "6px" )]] [text s]

sechib : String -> Html Message
sechib s =
    h3 [style [( "border-left", "3px solid #00e64d" ), ( "padding-left", "6px" )]] [text s]
