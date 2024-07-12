class AddUserRefToFishes < ActiveRecord::Migration[6.1]
  def change
    add_reference :fish, :user, foreign_key: true
  end
end