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
     br [] [],
     text "新しい自己 dex バフが追加される。",
     ulist ["Level 4 - Righteous Dexterity - 3.0s cast - 20m 継続 - 3 power - 12 dex",
           "Level 13 - Righteous Deftness - 3.0s cast - 20m 継続 - 11 power - 22 dex",
           "Level 21 - Righteous Proficiency - 3.0s cast - 20m 継続 - 16 power - 32 dex",
           "Level 31 - Virtuous Agility - 3.0s cast - 20m 継続 - 25 power - 42 dex",
           "Level 47 - Virtuous Fluidity - 3.0s cast - 20m 継続 - 43 power - 52 dex"],
     text "新しい single target major heal が追加される。",
     ulist ["Level 5 - Major Restoration - 3.2s cast - 2000 range - 5 power - 55 hit points",
           "Level 8 - Major Recuperation - 3.1s cast - 2000 range - 7 power - 82 hit points",
           "Level 11 - Major Renewal - 3.0s cast - 2000 range - 9 power - 109 hit points",
           "Level 14 - Major Revival - 2.9s cast - 2000 range - 11 power - 136 hit points",
           "Level 18 - Major Resuscitation - 2.8s cast - 2000 range - 14 power - 172 hit points",
           "Level 25 - Major Reviction - 2.7s cast - 2000 range - 19 power - 235 hit points",
           "Level 33 - Major Refection - 2.6s cast - 2000 range - 24 power - 307 hit points",
           "Level 43 - Major Refocillation - 2.5s cast - 2000 range - 30 power - 396 hit points"],
     text "group target resistance chant は除去される。",
     br [] [],
     text "group target multi-resist chant は除去される。",
     br [] [],
     text "新しい single target resistance buff が追加される。このレジストはクレリック、フライアーのレジストとスタックしない。",
     ulist ["Level 27 - Elemental Ward - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 8% 増加",
           "Level 46 - Elemental Shield - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 12% 増加"],
     secalb "Two-Handed (スペック)",
     ulist ["Level 34 - Obfuscate - Anytime - ダメージ減少",
            "Level 44 - Two Moons - Onslaught - ダメージ増加",
            "Level 50 - Sun and Moon - Doubler - ダメージ増加"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "パラディン 1.122B"],
     text "Realm Rank 5 Selfless Devotion は以下のように変更される。",
     ulist ["パラディンの能力値は減少しなくなる。",
            "グループサイズに応じてヒール量が変更される。パラディン自身は常に 100 heal/tick で回復する。2〜5人グループではグループメンバーは 300 heal/tick で回復する。6人以上のグループではグループメンバーは 500 heal/tick で回復する。",
            "ヒール量は healing effectiveness ボーナスによりボーナス値以上に増加する。"]]


patch_1_122B_HotFix : List (Html Message)
patch_1_122B_HotFix =
    [h2 [] [text "パラディン 1.122B Hot Fix"],
     text "Realm Rank 5 Selfless Devotion の最初の tick が正しく発動するようになる。"]


patch_1_122B_HotFix5 : List (Html Message)
patch_1_122B_HotFix5 =
    [h2 [] [text "パラディン 1.121B Hot Fix #5"],
     text "タウントが再び敵を妨害できるようになる。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "パラディン 1.123"],
     text "パラディンはフルリスペックされる。",
     secalb "Chants (スペック)",
     text "新しいグループヒールが追加される。",
     ulist ["Level 15 - Heaven's Commendation - Group - 2.6s cast - 2000 range - 32 power - 97回復",
            "Level 26 - Heaven's Benediction - Group - 2.4s cast - 2000 range - 50 power - 163回復",
            "Level 36 - Heaven's Blessing - Group - 2.2s cast - 2000 range - 64 power - 223回復",
            "Level 46 - Heaven's Approbation - Group - 2.0s cast - 2000 range - 75 power - 283回復"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix
      ++ patch_1_122B_HotFix5
      ++ patch_1_123
