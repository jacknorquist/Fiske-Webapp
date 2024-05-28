class Post < ApplicationRecord
    belongs_to :group
    belongs_to :user
    has_many :group_post_comments
    validates :title, presence: true, length: {maximum:100}
    validates :content, presence: true, length: {maximum:500}
  end