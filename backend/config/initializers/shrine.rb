require 'shrine'
require 'shrine/storage/s3'
require "shrine/plugins/activerecord"
require 'fastimage'

Shrine.plugin :determine_mime_type, analyzer: :fastimage


s3_options = {
  bucket: 'fiskebucket',
  region: 'us-east-2',             # e.g. "us-east-1"
  access_key_id: ENV['access_key_id'],
  secret_access_key: ENV['secret_access_key'],
}

Shrine.storages = {
  cache: Shrine::Storage::S3.new(prefix: 'cache', **s3_options),
  store: Shrine::Storage::S3.new(prefix: 'store', **s3_options),
}

puts "Access Key ID from ENV: #{ENV['access_key_id']}"
Shrine.plugin :activerecord           # If using ActiveRecord
Shrine.plugin :cached_attachment_data # For retaining cached file across form redisplays/