class AddImageToFish < ActiveRecord::Migration[7.1]
  def change
    add_column :fish, :image, :string
  end
end
