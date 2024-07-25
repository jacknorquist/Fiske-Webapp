class FishesController < ApplicationController
    # before_action :set_fish, only: [:show, :update, :destroy]

    def index
        fishes = Fish.includes(:fishboard).all
        render json: fishes.map { |fish| fish_json_with_image_url(fish) }
      end

      def show
        render json: fish_json_with_image_url(@fish)
      end
    # POST /fishes
    def create
        @fish = Fish.new(fish_params)

        existing_fish = Fish.where(
          species: @fish.species,
          fishboard_id: @fish.fishboard_id,
          fishboard_type: @fish.fishboard_type
        ).first

        if existing_fish
          if @fish.length > existing_fish.length
            existing_fish.destroy
            @fish.save
            render json: fish_json_with_image_url(@fish), status: :created
          else
            render json: {'Fish not added: another fish of the same species is longer or equal.' }, status: :unprocessable_entity
          end
        else
          if @fish.save
            render json: fish_json_with_image_url(@fish), status: :created
          else
            render json: @fish.errors, status: :unprocessable_entity
          end
        end
      end

    # PATCH/PUT /fishes/:id
    def update
      if @fish.update(fish_params)
        render json: @fish
      else
        render json: @fish.errors, status: :unprocessable_entity
      end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_fish
      @fish = Fish.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def fish_params
      params.permit(:species, :length, :image, :user_id, :fishboard_id, :fishboard_type) # Include fishboard_id in permitted attributes
    end

    def fish_json_with_image_url(fish)
        fish_attributes = fish.attributes
        fish_attributes['image_url'] = fish.image_url if fish.respond_to?(:image_url)  # Assuming fishboard has an image_url method
        fish_attributes
      end
  end