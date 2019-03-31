# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

#user_groupテーブル
|Column|Type|Option|
|:------|----:|:------:|
|name|string|null:false|
|user_id|integer|null:false,foreign_key:true|
|group_id|integer|null:false,foreign_key:true|

##アソシエーション
- belongs_to :group
- belongs_to :user

#userテーブル
|column|type|option|
|------|----|------|
|name|string|null:false|
|email|string|null:false|
|passwaord|string|null:false|

##アソシエーション
- has_many :groups,throgh user_group
- has_many :messages

#messageテーブル
|column|type|option|
|------|----|------|
|text|text|null:false|
|image|text||
|group_id|integer|null:false|
|user_id|integer|null:false|

##アソシエーション
- belongs_to :user
- belongs_to :group

#groupテーブル
|column|type|option|
|------|----|------|
|name|string|null:false|
|user_id|integer|null:false|
|message_id|integer|null:false|

##アソシエーション
- has_many :users,through user_group
- has_many :message


