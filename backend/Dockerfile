# syntax=docker/dockerfile:1
ARG RUBY_VERSION=3.0.2
FROM ruby:$RUBY_VERSION-slim as base

# Create a non-root user
RUN useradd -m rails

# Set working directory
WORKDIR /rails

# Set environment variables
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

FROM base as build

# Install dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libvips pkg-config libpq-dev

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./


# # Switch to the non-root user
# USER rails

# Install application gems
RUN bundle install

# Copy application code
COPY . .

#Set db per
USER root
RUN chmod -R 755 db && chown -R rails:rails db
RUN mkdir -p /rails/tmp/cache && chown -R rails:rails /rails/tmp


# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

FROM base

# Install runtime dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libvips libpq5 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Switch to the non-root user for runtime
USER rails

# Entrypoint prepares the database
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start the server by default
EXPOSE 3000
CMD ["./bin/rails", "server"]