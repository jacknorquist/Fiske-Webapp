class ReplaceActiveStorageWithShrineForPosts < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :images, :string
    add_column :posts, :images_data, :jsonb, default: [], null: false
  end
end