module Paladin exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "パラディン 1.121"],
     text "パラディンはフルリスペックされる。",
     text "レルムアビリティーに Mastery of Healing が追加される。",
     text "レルムアビリティーに Wild Healing が追加される。",
     secalb "Shield (スペック)",
     ulist ["Level 44 - Immobilize - 側面 - 21s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus.",
            "Level 46 - Cripple - 背後 - 23s snare - Low-damage - High endurance cost - No offensive bonus - Low defensive bonus."],
     secalb "Chants (スペック)",
     text "グループ endurance バフは pulse になる。",
     ulist ["Level 2 - Chant of Endurance - Instant cast - 8s 再使用 - 2000 range - 3 endurance",
            "Level 12 - Chant of Stamina - Instant cast - 8s 再使用 - 2000 range - 4 endurance",
            "Level 22 - Chant of Persistence - Instant cast - 8s 再使用 - 2000 range - 5 endurance",
            "Level 32 - Chant of Resilience - Instant cast - 8s 再使用 - 2000 range - 6 endurance",
            "Level 42 - Chant of Perseverance - Instant cast - 8s 再使用 - 2000 range - 7 endurance"],
     text "新しい group instant heal が追加される。",
     ulist ["Level 2 - Holy Recovery - Instant cast - 再使用60秒 - 1500 range - 5% power - 25 hit points",
            "Level 5 - Holy Renewal - Instant cast - 再使用60秒 - 1500 range - 5% power - 50 hit points",
            "Level 12 - Holy Refreshment - Instant cast - 再使用60秒 - 1500 range - 10% power - 100 hit points",
            "Level 20 - Holy Restoration - Instant cast - 再使用60秒 - 1500 range - 20% power - 180 hit points",
            "Level 35 - Holy Rejuvenation - Instant cast - 再使用60秒 - 1500 range - 25% power - 250 hit points",
            "Level 45 - Holy Revitalization - Instant cast - 再使用60秒 - 1500 range - 35% power - 300 hit points"],
     text "グループ魔法吸収チャントは削除される。",
     br [] [],
     text "新しい single target 魔法吸収バフが追加される。自分に対しては使えない。",
     ulist ["Level 30 - Barrier of Faith - 2.8s cast - 再使用60秒 - 1500 range - 30秒間継続 - 10% power - 300 magic damage",
           "Level 40 - Barrier of Virtue - 2.8s cast - 再使用60秒 - 1500 range - 30秒間継続 - 15% power - 375 magic damage",
           "Level 50 - Barrier of Temperance - 2.8s cast - 再使用60秒 - 1500 range - 30秒間継続 - 20% power - 500 magic damage"],
     text "新しい自己 dex バフが追加される。",
     ulist ["Level 4 - Righteous Dexterity - 3.0s cast - 20m 継続 - 3 power - 12 dex",
           "Level 13 - Righteous Deftness - 3.0s cast - 20m 継続 - 11 power - 22 dex",
           "Level 21 - Righteous Proficiency - 3.0s cast - 20m 継続 - 16 power - 32 dex",
           "Level 31 - Virtuous Agility - 3.0s cast - 20m 継続 - 25 power - 42 dex",
           "Level 47 - Virtuous Fluidity - 3.0s cast - 20m 継続 - 43 power - 52 dex"],
     text "新しい single target major heal が追加される。",
     ulist ["Level 5 - Major Restoration - 3.2s cast - 2000 range - 5 power - 55 hit points",
           "Level 8 - Major Recuperation - 3.2s cast - 2000 range - 7 power - 82 hit points",
           "Level 11 - Major Renewal - 3.2s cast - 2000 range - 9 power - 109 hit points",
           "Level 14 - Major Revival - 3.2s cast - 2000 range - 11 power - 136 hit points",
           "Level 18 - Major Resuscitation - 3.2s cast - 2000 range - 14 power - 172 hit points",
           "Level 25 - Major Reviction - 3.2s cast - 2000 range - 19 power - 235 hit points",
           "Level 33 - Major Refection - 3.2s cast - 2000 range - 24 power - 307 hit points",
           "Level 43 - Major Refocillation - 3.2s cast - 2000 range - 30 power - 396 hit points"],
     text "group target resistance chant は除去される。",
     br [] [],
     text "group target multi-resist chant は除去される。",
     br [] [],
     text "新しい single target resistance buff が追加される。",
     ulist ["Level 27 - Elemental Ward - 4.0s cast - 1500 range - 20m 継続 - 5% power - すべてのレジストを 8% 増加",
           "Level 46 - Elemental Shield - 4.0s cast - 1500 range - 20m 継続 - 5% power - すべてのレジストを 12% 増加"],
     secalb "Two-Handed (スペック)",
     ulist ["Level 34 - Obfuscate - Anytime - スタイルダメージやや減少",
            "Level 44 - Two Moons - Onslaught - スタイルダメージ増加",
            "Level 50 - Sun and Moon - Doubler - スタイルダメージ増加"]]
