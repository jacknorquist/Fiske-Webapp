class AddShrineImagesToFishes < ActiveRecord::Migration[7.1]
  def change
    remove_column :fish, :image, :string
    add_column :fish, :profile_image_data, :text
  end
end
