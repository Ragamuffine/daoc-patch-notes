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


color_alb : String
color_alb = "#cc0000"


color_mid : String
color_mid = "#00afee"


color_hib : String
color_hib = "#00e64d"


color_common : String
color_common = "#cc9900"


sec_template : String -> String -> Html Message
sec_template color message =
    h3 [style [( "border-left", "3px solid " ++ color ), ( "padding-left", "6px" )]] [text message]


secalb : String -> Html Message
secalb = sec_template color_alb


secmid : String -> Html Message
secmid = sec_template color_mid


sechib : String -> Html Message
sechib = sec_template color_hib


make_content : List (Html Message) -> Html Message
make_content content =
    div [class "uk-width-medium-5-6", style [( "margin-top", "40px" ), ( "margin-left", "auto" ), ( "margin-right", "auto" )]]
        [article [class "uk-article"] content]
