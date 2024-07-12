class GroupFishboard < ApplicationRecord
  belongs_to :group
  has_many :fish, as: :fishboard, dependent: :destroy
end
