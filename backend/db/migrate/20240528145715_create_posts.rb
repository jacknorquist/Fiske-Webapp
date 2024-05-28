class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    drop_table :posts
    create_table :posts do |t|
      t.references :group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false, limit: 100
      t.text :content, null: false, limit: 500

      t.timestamps
    end
  end
end