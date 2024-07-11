class Fish < ApplicationRecord
    belongs_to :fishboard

    validates :species, presence: true
    validates :length, numericality: { greater_than: 0 }
  end