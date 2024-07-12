class Fish < ApplicationRecord
  belongs_to :fishboard, polymorphic: true
  has_one :user

  validates :species, uniqueness: { scope: [:fishboard_id, :fishboard_type], message: "already exists in this fishboard" }
  validates :length, numericality: { greater_than_or_equal_to: 0 }


  include ImageUploader[:image]


  def image_url
    return unless image_attacher&.file&.exists?
   image.url
  end



end

