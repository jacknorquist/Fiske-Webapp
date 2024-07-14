class Fish < ApplicationRecord
  belongs_to :fishboard, polymorphic: true
  belongs_to :user

  validates :species, uniqueness: { scope: [:fishboard_id, :fishboard_type], message: "already exists in this fishboard" }
  validates :length, numericality: { greater_than_or_equal_to: 0 }


  after_create :award_points

  include ImageUploader[:image]


  def image_url
    return unless image_attacher&.file&.exists?
   image.url
  end

  def award_points
    return unless fishboard.is_a?(GroupFishboard)

    user.increment(:fishboard_points, 1)
    puts 'made it hereeeeeeeeeeeeee'
    user.save
  end



end

