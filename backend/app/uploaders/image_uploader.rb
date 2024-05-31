require "shrine"
require "shrine/storage/s3"


class ImageUploader < Shrine
  # Use S3 storage for uploaded files

  # # Define default storage options
  # plugin :default_storage, cache: :cache, store: :store

  # # Define S3 storage options
  #   access_key_id:     Rails.application.credentials.dig(:aws, :access_key_id),
  #   secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key),
  #   region:            "us-east-2",
  #   bucket:            "fiskebucket"





  storages[:store] = Shrine::Storage::S3.new(
    access_key_id:     Rails.application.credentials.dig(:aws, :access_key_id),
    secret_access_key: Rails.application.credentials.dig(:aws, :secret_access_key),
    region:            "us-east-2",
    bucket:            "fiskebucket"
    )

    plugin :pretty_location
    plugin :default_storage, cache: :cache, store: :store
    plugin :remove_attachment
    plugin :validation_helpers
    plugin :determine_mime_type
    plugin :store_dimensions
    # Define default storage location
  # plugin :default_storage, store: :store

end