class CreateClickEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :click_events, id: :uuid do |t|
      t.string :ip_address
      t.json :ip_info
      t.string :country
      t.string :browser
      t.string :device
      t.datetime :event_at
      t.references :link, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
