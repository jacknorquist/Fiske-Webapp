class Fish < ApplicationRecord
    belongs_to :fishboard, polymorphic: true
    validates :species, uniqueness: { scope: [:fishboard_id, :fishboard_type], message: "already exists in this fishboard" }
    validates :length, numericality: { greater_than_or_equal_to: 0 }
  end